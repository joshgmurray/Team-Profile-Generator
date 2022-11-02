const fs = require('fs');
const inquirer = require('inquirer');

const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');

const renderHTML = require('./src/renderHTML');

const teamData = [];

// get manager data
const addManager = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is Team Managers name?',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'id',
            message: "What is team managers ID.",
            validate: nameInput => {
                if (isNaN(nameInput)) {
                    return false;
                } else {
                    return true;
                }
            }
        },
        {
            type: 'input',
            name: 'email',
            message: "Enter team managers email",
            validate: email => {
                valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
                if (valid) {
                    return true;
                } else {
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'number',
            message: "Team managers phone number",
            validate: nameInput => {
                if (isNaN(nameInput)) {
                    return false;
                } else {
                    return true;
                }
            }
        }
    ])
        .then(managerInput => {
            const { name, id, email, number } = managerInput;
            const manager = new Manager(name, id, email, number);

            teamData.push(manager);
        })
};

const addEmployee = () => {

    return inquirer.prompt([
        {
            type: 'list',
            name: 'role',
            message: "Employee's role",
            choices: ['Engineer', 'Intern']
        },
        {
            type: 'input',
            name: 'name',
            message: "Enter employees name",
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'id',
            message: "Enter employee ID.",
            validate: nameInput => {
                if (isNaN(nameInput)) {
                    return false;
                } else {
                    return true;
                }
            }
        },
        {
            type: 'input',
            name: 'email',
            message: "Whats the employee's email?",
            validate: email => {
                valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
                if (valid) {
                    return true;
                } else {
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'github',
            message: "Enter github user for employee",
            when: (input) => input.role === "Engineer",
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'school',
            message: "What school does the intern attend?",
            when: (input) => input.role === "Intern",
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    return false;
                }
            }
        },
        {
            type: 'confirm',
            name: 'confirmAddEmployee',
            message: 'Add more team members?',
            default: false
        }
    ])
        .then(employeeData => {
            let { name, id, email, role, github, school, confirmAddEmployee } = employeeData;
            let employee;

            if (role === "Engineer") {
                employee = new Engineer(name, id, email, github);

            } else if (role === "Intern") {
                employee = new Intern(name, id, email, school);

            }

            teamData.push(employee);

            if (confirmAddEmployee) {
                return addEmployee(teamData);
            } else {
                return teamData;
            }
        })

};


// generate team page
const writeFile = data => {
    fs.writeFile('./dist/index.html', data, err => {
        if (err) {
            console.log(err);
            return;
        } else {
            console.log("team created!")
        }
    })
};

addManager()
    .then(addEmployee)
    .then(teamData => {
        return renderHTML(teamData);
    })
    .then(pageHTML => {
        return writeFile(pageHTML);
    })
    .catch(err => {
        console.log(err);
    });