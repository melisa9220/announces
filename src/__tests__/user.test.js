const { TestWatcher } = require("jest");
const User = require('../models/mongodb/users');
jest.mock('../models/mongodb/users');
const userRepository = require('../repository/userRepository');

describe("User repository", () => {
    const newUser = new User();
    beforeAll(() => {
        newUser.save.mockResolvedValue({name: 'Ana Cardona', username: 'ana12', id: '2345fghj'});
    });
    test("It should create a user", async () => {
        
        const data = {
         name: 'Ana Cardona',
         username: 'ana12',
         password: 'ana123'
        };
        const user = await userRepository.saveUser(data);
        console.log('savedUser: ',user);
        
        expect(newUser.save).toHaveBeenCalled();
        expect(user).toEqual(expect.not.objectContaining(data));
       
    });

});
