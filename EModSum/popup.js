document.addEventListener('DOMContentLoaded', () => {
    //Generate Excel
    document.getElementById('generate').addEventListener('click', () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                function: () => {
                    // Extract data from the webpage
                    const rows = document.querySelectorAll('tr');
                    const data = {};

                    const today = new Date();
                    const options = { day: 'numeric', month: 'short' };
                    const formattedDate = today.toLocaleDateString(undefined, options);

                    console.log("Total rows found:", rows.length); // Log number of rows found

                    // Loop through each row to extract data
                    rows.forEach(row => {
                        const dateElement = row.querySelector('td:nth-child(3) label'); // Selector for date
                        const nameElement = row.querySelector('td:nth-child(4) label'); // Selector for name

                        // Log the elements to check if they're found
                        console.log("Date Element:", dateElement);
                        console.log("Name Element:", nameElement);

                        // Ensure all elements are found before processing
                        if (dateElement && nameElement) {
                            const dateStr = dateElement.innerText.trim();
                            const name = nameElement.innerText.trim().slice(0, -2);;
                            
                            // Parse the date and remove the time
                            const date = new Date(dateStr);
                            const formattedDate = date.toLocaleDateString(); // Format to YYYY-MM-DD

                            // Check if the name already exists in the data object
                            if (!data[name] || new Date(data[name].date) < date) {
                                // Update the entry with the latest date
                                data[name] = { date: formattedDate, name: name };
                            }
                        }
                    });

                    console.log("Extracted Data:", Object.values(data)); // Log the extracted data
                    return Object.values(data); // Return the unique entries
                }
            }, (results) => {
                if (chrome.runtime.lastError) {
                    console.error(chrome.runtime.lastError);
                    return; // Handle runtime error if any
                }

                const data = results[0].result;
                console.log("Data received in popup.js:", data); // Log received data

                // Check if data is not empty
                if (data && data.length > 0) {

                    data.reverse();
                    // Prepare Excel data with headers
                    const headers = [
                        { header: 'Date', key: 'date' },
                        { header: 'Name', key: 'name' }
                    ];
                    const workbook = XLSX.utils.book_new();
                    const worksheet = XLSX.utils.json_to_sheet(data);

                    // Add headers to the worksheet
                    XLSX.utils.sheet_add_aoa(worksheet, [headers.map(h => h.header)], { origin: "A1" });
                    XLSX.utils.book_append_sheet(workbook, worksheet, "Submissions ${formattedDate}");

                    // Write the Excel file
                    XLSX.writeFile(workbook, "submissions.xlsx");
                } else {
                    console.log("No data found to generate Excel.");
                }
            });
        });
    });
    //Open tabs based on unique submission
    document.getElementById('openTab').addEventListener('click', () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs.length === 0) return; // No active tab found
            
            const currentTabUrl = tabs[0].url; // Get the URL of the current active tab
    
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                function: () => {
                    const elements = document.querySelectorAll('.daylight span.dfl'); // Select elements
                    let count = 0;
    
                    // Count the number of elements with font-weight: 700
                    elements.forEach(element => {
                        const style = window.getComputedStyle(element);
                        if (style.fontWeight === '700') {
                            count++;
                        }
                    });
    
                    return count; // Return the count of elements with font-weight: 700
                }
            }, (results) => {
                if (chrome.runtime.lastError) {
                    console.error(chrome.runtime.lastError);
                    return;
                }
    
                const count = results[0].result; // Get the count of elements
                const numberOfTabs = Math.floor(count / 2); // Divide by 2
                const urlToOpen = tabs[0].url; // Use the current tab's URL
    
                // Open the specified number of tabs
                for (let i = 0; i < numberOfTabs; i++) {
                    chrome.tabs.create({ url: urlToOpen });
                }
            });
        });
    });
    
    //All criteria met
    document.getElementById('acm').addEventListener('click', () => {

        const today = new Date();
        const options = { day: 'numeric', month: 'short' };
        const formattedDate = today.toLocaleDateString(undefined, options);

        // Construct the text to copy
        const textToCopy = `Student Assessor 23 (${formattedDate}): Thank you for your submission. All criteria met.`;
    
        // Use the Clipboard API to copy the text
        navigator.clipboard.writeText(textToCopy)
            .then(() => {
                console.log("Text copied to clipboard successfully!");
            })
            .catch(err => {
                console.error("Failed to copy text to clipboard: ", err);
            });
    });
    //Task 1
    document.getElementById('t1').addEventListener('click', () => {

        const today = new Date();
        const options = { day: 'numeric', month: 'short' };
        const formattedDate = today.toLocaleDateString(undefined, options);

        // Construct the text to copy
        const textToCopy = `Student Assessor 23 (${formattedDate}): Thank you for your submission. For assignment task 1, please refer to step 11 of the assignment guide. Please ensure to download the infographic from Canva directly in PDF format and upload it separately. Please also ensure to re-upload all tasks in your next submission.`;
    
        // Use the Clipboard API to copy the text
        navigator.clipboard.writeText(textToCopy)
            .then(() => {
                console.log("Text copied to clipboard successfully!");
            })
            .catch(err => {
                console.error("Failed to copy text to clipboard: ", err);
            });
    });
    //Task 2
    document.getElementById('t2').addEventListener('click', () => {

        const today = new Date();
        const options = { day: 'numeric', month: 'short' };
        const formattedDate = today.toLocaleDateString(undefined, options);

        // Construct the text to copy
        const textToCopy = `Student Assessor 23 (${formattedDate}): Thank you for your submission. For assignment task 2, please refer to step 13 of the assignment guide. One of the names is missing in the submission. Please ensure that the faces and names of both team members and final infographic are clearly shown in the screenshot. Please also ensure to re-upload all tasks in your next submission.`;
    
        // Use the Clipboard API to copy the text
        navigator.clipboard.writeText(textToCopy)
            .then(() => {
                console.log("Text copied to clipboard successfully!");
            })
            .catch(err => {
                console.error("Failed to copy text to clipboard: ", err);
            });
    });
    //Both tasks
    document.getElementById('both').addEventListener('click', () => {

        const today = new Date();
        const options = { day: 'numeric', month: 'short' };
        const formattedDate = today.toLocaleDateString(undefined, options);

        // Construct the text to copy
        const textToCopy = `Student Assessor 23 (${formattedDate}): Thank you for your submission. For assignment task 1, please refer to step 11 of the assignment guide. Please ensure that your infographic has two student names and student IDs. For assignment task 2, please refer to step 13 of the assignment guide. Please ensure that the faces, student IDs and names of both team members and the final infographic are clearly shown in the screenshot. Please also ensure to re-upload all tasks in your next submission.`;
    
        // Use the Clipboard API to copy the text
        navigator.clipboard.writeText(textToCopy)
            .then(() => {
                console.log("Text copied to clipboard successfully!");
            })
            .catch(err => {
                console.error("Failed to copy text to clipboard: ", err);
            });
    });
    //Read feedback below
    document.getElementById('same').addEventListener('click', () => {

        const today = new Date();
        const options = { day: 'numeric', month: 'short' };
        const formattedDate = today.toLocaleDateString(undefined, options);

        // Construct the text to copy
        const textToCopy = `Student Assessor 23 (${formattedDate}): Thank you for submitting your Final Assignment. Please read the feedback below carefully and update accordingly. Kindly resubmit after making the changes.`;
    
        // Use the Clipboard API to copy the text
        navigator.clipboard.writeText(textToCopy)
            .then(() => {
                console.log("Text copied to clipboard successfully!");
            })
            .catch(err => {
                console.error("Failed to copy text to clipboard: ", err);
            });
    });
    //Upload separately
    document.getElementById('separate').addEventListener('click', () => {

        const today = new Date();
        const options = { day: 'numeric', month: 'short' };
        const formattedDate = today.toLocaleDateString(undefined, options);

        // Construct the text to copy
        const textToCopy = `Student Assessor 23 (${formattedDate}): Thank you for your submission. Please ensure to re-upload all tasks separately in 2 files for your next submission.`;
    
        // Use the Clipboard API to copy the text
        navigator.clipboard.writeText(textToCopy)
            .then(() => {
                console.log("Text copied to clipboard successfully!");
            })
            .catch(err => {
                console.error("Failed to copy text to clipboard: ", err);
            });
    });
});
