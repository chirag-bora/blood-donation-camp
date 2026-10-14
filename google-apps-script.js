/**
 * ============================================================================
 * BLOOD DONATION CAMP - GOOGLE APPS SCRIPT WEB APP
 * ============================================================================
 * This script runs in Google Sheets (Extensions > Apps Script).
 * It listens for POST requests from our Next.js backend and appends
 * validated, sanitized donor registrations as new rows in real-time.
 * ============================================================================
 */

// Optional shared security token (matches APPS_SCRIPT_SECRET in Next.js .env)
var INTEGRATION_SECRET = "CHANGE_ME_OR_SET_SECRET_TOKEN";

function doPost(e) {
  var lock = LockService.getScriptLock();
  // Wait up to 30 seconds for concurrent requests
  try {
    lock.waitLock(30000);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: "Server busy. Could not obtain write lock. Please retry."
    })).setMimeType(ContentService.MimeType.JSON);
  }

  try {
    if (!e || !e.postData || !e.postData.contents) {
      return ContentService.createTextOutput(JSON.stringify({
        success: false,
        error: "No payload provided."
      })).setMimeType(ContentService.MimeType.JSON);
    }

    var data;
    try {
      data = JSON.parse(e.postData.contents);
    } catch (parseErr) {
      return ContentService.createTextOutput(JSON.stringify({
        success: false,
        error: "Invalid JSON format."
      })).setMimeType(ContentService.MimeType.JSON);
    }

    // Security check: verify secret if configured
    if (INTEGRATION_SECRET && INTEGRATION_SECRET !== "CHANGE_ME_OR_SET_SECRET_TOKEN") {
      if (data.secret !== INTEGRATION_SECRET) {
        return ContentService.createTextOutput(JSON.stringify({
          success: false,
          error: "Unauthorized: Invalid integration secret."
        })).setMimeType(ContentService.MimeType.JSON);
      }
    }

    // Input validation
    var fullName = (data.fullName || "").toString().trim();
    var mobileNumber = (data.mobileNumber || "").toString().trim();
    var age = parseInt(data.age, 10);
    var bloodGroup = (data.bloodGroup || "Not Specified").toString().trim();
    var locality = (data.city || data.locality || "Not Specified").toString().trim();
    var previousDonation = (data.previousDonation || "Not Specified").toString().trim();
    var consentGiven = data.consentGiven === true || data.consentGiven === "true";
    var referenceNumber = (data.referenceNumber || "").toString().trim();

    if (!fullName || fullName.length < 2) {
      return ContentService.createTextOutput(JSON.stringify({
        success: false,
        error: "Full name is required (min 2 chars)."
      })).setMimeType(ContentService.MimeType.JSON);
    }

    // Indian phone check: 10 digits
    var cleanPhone = mobileNumber.replace(/[^0-9]/g, "");
    if (cleanPhone.length > 10 && cleanPhone.startsWith("91")) {
      cleanPhone = cleanPhone.substring(2);
    }
    if (cleanPhone.length !== 10 || !/^[6-9]\d{9}$/.test(cleanPhone)) {
      return ContentService.createTextOutput(JSON.stringify({
        success: false,
        error: "A valid 10-digit Indian mobile number is required."
      })).setMimeType(ContentService.MimeType.JSON);
    }

    if (isNaN(age) || age < 18 || age > 65) {
      return ContentService.createTextOutput(JSON.stringify({
        success: false,
        error: "Age must be between 18 and 65."
      })).setMimeType(ContentService.MimeType.JSON);
    }

    if (!consentGiven) {
      return ContentService.createTextOutput(JSON.stringify({
        success: false,
        error: "Donor consent is mandatory."
      })).setMimeType(ContentService.MimeType.JSON);
    }

    // Reference ID generation if missing
    if (!referenceNumber) {
      var rand = Math.random().toString(36).substring(2, 8).toUpperCase();
      referenceNumber = "RD-2026-" + rand;
    }

    // Get Active Spreadsheet Sheet
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Ensure header row exists
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Registration ID",
        "Registration Date & Time (IST)",
        "Full Name",
        "Mobile Number",
        "Age",
        "Blood Group",
        "Locality / City",
        "Previous Donation",
        "Registration Status",
        "Consent Given",
        "Consent Timestamp (IST)"
      ]);

      // Format Header row
      var headerRange = sheet.getRange(1, 1, 1, 11);
      headerRange.setBackground("#D71920");
      headerRange.setFontColor("#FFFFFF");
      headerRange.setFontWeight("bold");
      sheet.setFrozenRows(1);
    }

    // Formatted IST Timestamp
    var now = new Date();
    var istTimestamp = Utilities.formatDate(now, "Asia/Kolkata", "dd-MMM-yyyy hh:mm:ss a");

    // Sanitize user inputs to prevent CSV/Spreadsheet formula execution (=, +, -, @)
    function sanitize(val) {
      if (val === null || val === undefined) return "";
      var str = val.toString().trim();
      if (/^[=+\-@]/.test(str)) {
        return "'" + str;
      }
      return str;
    }

    // Append new donor record
    var newRow = [
      sanitize(referenceNumber),
      istTimestamp,
      sanitize(fullName),
      "'" + cleanPhone, // Store as text string so leading zeros and formatting remain intact
      age,
      sanitize(bloodGroup),
      sanitize(locality),
      sanitize(previousDonation),
      "Registered", // Default initial status
      "Yes",
      istTimestamp
    ];

    sheet.appendRow(newRow);

    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      referenceNumber: referenceNumber,
      fullName: fullName,
      timestamp: istTimestamp
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: "Internal script error: " + error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: "online",
    message: "Blood Donation Camp Google Sheets Endpoint is running."
  })).setMimeType(ContentService.MimeType.JSON);
}
