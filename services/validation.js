 export function validateForm(data) //for app.js you need to import and export. app.js is server side. 
{

const errors = [];


if (!data.name || data.name.trim() === "") //if no name exists 
    {
    errors.push("First name is required"); //error will popup
    }


if (!data.company || data.company.trim() === "") 
    {
    errors.push("Company is required"); //error will popup
    }



if (!data.Email || data.Email.trim() === "" || data.Email.indexOf("@") === -1
        || data.Email.indexOf(".") === -1) 
    {
        errors.push("Email is missing or invalid");
    }

if (!data.howdidwemeet)    //data spoof proof is a else statements 
    {
        errors.push("Select pickup or delivery");
    } else {
        const validOptions = [ "Friends", "jobFair", "Work", "socialMedia", "School"];
        if (!validOptions.includes(data.howdidwemeet)) {
            errors.push("Go away, evildoer!");
        }
    }


    return {   //if you return multiple data ie boolean and errors then {} needs to be on same line as the word return
        isValid: errors.length === 0, //if no errors then return true
        errors
    };

}





























// export function validateForm(data) {

    //     const errors = [];
    
    //     //
    //     if (!data.fname || data.fname.trim() === "") {
    //         errors.push("First name is required");
    //     };
    
    //     if (!data.lname || data.lname.trim() === "") {
    //         errors.push("Last name is required");
    //     };
    
    
    //     if (!data.email || data.email.trim() === "" || data.email.indexOf("@") === -1
    //         || data.email.indexOf(".") === -1) {
    //         errors.push("Email is missing or invaild");
    //     };
    
    //     if (!data.method) {
    //         errors.push("You must select a delivery method");
    //     } else {
    //         const validOptions = ["pickup", "delivery"];
    //         if (!validOptions.includes(data.method)) {
    //             errors.push("Go away, METHOD evildoer!");
    //         }
    //     }
    
    //     if (data.size === "none") {
    //         errors.push("You must select a size");
    //     } else {
    //         const validSizes = ["small", "med", "large"];
    //         if (!validSizes.includes(data.size)) {
    //             errors.push("Go away SIZE evildoer!");
    //         }
    //     }
    
    
    //     return {
    //         isValid: errors.length === 0,
    //         errors
    //     };
    // }