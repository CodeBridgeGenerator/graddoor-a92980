
import { faker } from "@faker-js/faker";
export default (user,count) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
urID: faker.lorem.sentence(1),
uniID: faker.lorem.sentence(1),
sID: faker.lorem.sentence(1),
rating: faker.lorem.sentence(1),
pros: faker.lorem.sentence(1),
cons: faker.lorem.sentence(1),
comment: faker.lorem.sentence(1),
createdAT: faker.lorem.sentence(1),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
