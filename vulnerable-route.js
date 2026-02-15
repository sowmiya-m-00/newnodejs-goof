const express = require('express');
const router = express.Router();
const { exec } = require('child_process');

// 1. Command Injection (High Severity)
// Snyk will flag 'exec' when it takes un-sanitized input from req.query
router.get('/ping', (req, res) => {
  const ip = req.query.ip;
  exec(`ping -c 3 ${ip}`, (err, stdout) => {
    res.send(stdout);
  });
});

// 2. Open Redirect (Medium Severity)
// Snyk flags res.redirect when the URL is directly from the user
router.get('/login', (req, res) => {
  const target = req.query.url;
  res.redirect(target); 
});

// 3. Path Traversal (High Severity)
// Using user input to construct a file path
router.get('/read', (req, res) => {
  const fileName = req.query.file;
  const path = __dirname + '/public/' + fileName;
  res.sendFile(path);
});

module.exports = router;
