// using Engineer constructor 
const Engineer = require('../lib/Engineer');

test('creates an Engineer object', () => {
    const engineer = new Engineer('Josh', 4317, 'joshgmurray@gmail.com', 'joshgmurray');
    
    expect(engineer.github) .toEqual(expect.any(String));
});

test('gets engineer github value', () => {
    const engineer = new Engineer('Josh', 4317, 'joshgmurray@gmail.com', 'joshgmurray');

    expect(engineer.getGithub()).toEqual(expect.stringContaining(engineer.github.toString()));
});

test('gets role of employee', () => {
    const engineer = new Engineer('Josh', 4317, 'joshgmurray@gmail.com', 'joshgmurray');

    expect(engineer.getRole()).toEqual("Engineer");
});