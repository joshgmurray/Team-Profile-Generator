const Manager = require('../lib/Manager');

test('creates a Manager object', () => {
    const manager = new Manager('Josh', 4317, 'joshgmurray@gmail', 21);
    
    expect(manager.officeNumber).toEqual(expect.any(Number));
});

test('gets employee role', () => {
    const manager = new Manager('Josh', 4317, 'joshgmurray@gmail.com');

    expect(manager.getRole()).toEqual("Manager");
}); 