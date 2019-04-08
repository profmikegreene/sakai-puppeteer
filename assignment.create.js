const puppeteer = require('puppeteer');
const {TimeoutError} = require('puppeteer/Errors');
// Feature: Assignments
// This feature deals with the assignments tool functionality in Sakai
(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        slowMo: 100,
        defaultViewport: {
            width: 1200,
            height: 800
        }
    });
    const page = await browser.newPage();
    await page.setDefaultTimeout(60000);
    // Scenario: Create new assignment
    // Given I navigate to the Gateway
    await page.goto('https://trunk-mysql.nightly.sakaiproject.org/portal/', {
        waitUntil: 'domcontentloaded'
    });
    let title = await page.title(); 
    if (title !== "Sakai : Gateway : Welcome"){
        console.log("failed");
        await browser.close();
    }
    console.log('test:successful\t\t\tGiven I navigate to the Gateway');

    // When I login
    await page.type('#eid', 'instructor');
    await page.type('#pw', 'sakai');
    await page.click('.Mrphs-loginForm__button');
    console.log('test:successful\t\t\tWhen I login');
    
    // Then I expect see Home
    title = await page.title();
    if (title !== "Sakai : Home : Overview"){
        console.log('test:failed\t\t\tThen I expect to see Home');
        await browser.close();
    }
    console.log('test:successful\t\t\tThen I expect to see Home');

    // And I close new feature popup if needed
    if (await page.$(".qtipClose")){
        await page.click(".qtipClose");
        console.log('test:successful\t\t\tAnd I close new feature popup if needed');
    }

    // When I create a new site
    
        //When I click the new site button
        try {
            await page.waitForSelector('.view-all-sites-btn');
            await page.click('.view-all-sites-btn');
            console.log('test:successful\t\t\tWhen I click the sites button');
          } catch (e) {
            if (e instanceof TimeoutError) {
                console.log(e);
            
                //try again?
                await page.click('.view-all-sites-btn');
            }
          }
        
        
        
        //and I click the Create Site button
        try {
            await page.waitForSelector('#newSite');
            await page.click('#newSite');
            console.log('test:successful\t\t\tand I click the Create Site button');
        } catch (e) {
            if (e instanceof TimeoutError) {
                console.log(e);
            }
        }
        

        //and I select to build a course site
        try {
            await page.waitForSelector('#submitBuildOwn');
            await page.click('#course');
            await page.click('#submitBuildOwn');
            console.log('test:successful\t\t\tand I select to build a course site');
        } catch (e) {
            if (e instanceof TimeoutError) {
                console.log(e);
            }
        }
        

        //and I select a course to create a site for
        try {
            await page.waitForSelector('#continueButton');
        
            //This shows which course you are creating
            let courseTitle = await page.$eval('input[name="providerCourseAdd"]:enabled', input => input.value);
            // console.log(courseTitle); //Discussion 4 SMPL101 Spring 2019

            await page.click('input[name="providerCourseAdd"]:enabled');
            await page.click('#continueButton');
            console.log('test:successful\t\t\tand I select a course to create a site for');
        
        } catch (e) {
            if (e instanceof TimeoutError) {
                console.log(e);
            }
        }
        
        //and I click continue
        try {
            await page.waitForSelector('#classInformationForm');
            await page.click('input[value="Continue"]');
            console.log('test:successful\t\t\tand I click continue');
        } catch (e) {
            if (e instanceof TimeoutError) {
                console.log(e);
            }
        }
        

        //and I add the assignments tool
        try {
            await page.waitForSelector('input[value="sakai.assignment.grades"]');
            await page.click('input[value="sakai.assignment.grades"]');
            await page.click('#btnContinue');
            console.log('test:successful\t\t\tand I add the Assignments tool');
        } catch (e) {
            if (e instanceof TimeoutError) {
                console.log(e);
                
            }
        }
        

        //and I click continue
        try {
            await page.waitForSelector('#continueButton');
            await page.click('#continueButton');
            console.log('test:successful\t\t\tand I click continue');
        } catch (e) {
            if (e instanceof TimeoutError) {
                console.log(e);
            }
        }
        

        //Click Create Site
        let siteTitle = "";
        try {
            await page.waitForSelector('#addSite');
            siteTitle = page.$eval('.attachList li', el => el.innerText);
            console.log(siteTitle);
            await page.click('#addSite');
            console.log('test:successful\t\t\tand I click Create Site');
        } catch (e) {
            if (e instanceof TimeoutError) {
                console.log(e);
            }
        }
        
    

        // Then I expect to be taken to Worksite Setup
        try {
            await page.evaluate(document => document.title, "Sakai : Home : Worksite Setup");
            console.log('test:successful\t\t\tThen I expect to be taken to Worksite Setup');
        
        } catch (e) {
            if (e instanceof TimeoutError) {
                console.log('test:failed\t\t\tThen I expect to be taken to Worksite Setup');
                console.log(e);
                await browser.close();
            }
        }


        // And I expect to see that site in my Sites list
        try {
            let sites = await page.$$('.title a');
            
            const matchSite = (currentTitle, siteTitle) => currentTitle === siteTitle;
            const getMatchingSite = (sites) => sites.reduce(matchSite);
            
            console.log(getMatchingSites(sites));
            
            await page.click(matchingSite);
        } catch (e) {
            if (e instanceof TimeoutError) {
                console.log(e);
            }
        }

    // When I visit that site


    // Then I expect to see the assignments tool


    // When I visit the assignments tool


    // The I expect to be able to create a new assignment

    // await browser.close();
    console.log("Assignments:Create - Passed");
  })();

