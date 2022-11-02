const Manager = require('../lib/Manager');

test('creates an Manager object', () => {
    const manager = new Manager('Josh', 4317, 'joshgmurray@gmail', 21);
    
    expect(manager.officeNumber).toEqual(expect.any(Number));
});

test('gets role of employee', () => {
    const manager = new Manager('Josh', 4317, 'joshgmurray@gmail.com');

    expect(manager.getRole()).toEqual("Manager");
}); 