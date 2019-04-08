const puppeteer = require('puppeteer');

// Feature: Login
// This feature deals with the login and logout functionality of Sakai
(async () => {
    const browser = await puppeteer.launch({headless: false, slowMo: 250});
    const page = await browser.newPage();
  
    // Scenario: Log in
    // Given I navigate to the Gateway
    await page.goto('https://trunk-mysql.nightly.sakaiproject.org/portal/', {
        waitUntil: 'domcontentloaded'
    });
    let title = await page.title(); 
    if (title !== "Sakai : Gateway : Welcome"){
        console.log("failed");
        await browser.close();
    }

    // When I login
    await page.type('#eid', 'student');
    await page.type('#pw', 'sakai');
    await page.click('.Mrphs-loginForm__button');
    await page.waitForNavigation();
    
    // Then I expect see Home
    title = await page.title();
    if (title !== "Sakai : Home : Overview"){
        console.log("failed");
        await browser.close();
    }

    // And I close new feature popup if needed
    if (await page.$(".qtipClose")){
        await page.click(".qtipClose");
    }

    await browser.close();
    console.log("Login - Passed");
  })();

//   Scenario: Log out of Sakai
//     Given I am logged in
//     When I log out
//     Then I should see the Gateway

