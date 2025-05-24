
import { faker } from "@faker-js/faker";
export default (user,count) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
uID: faker.lorem.sentence(1),
lectID: faker.lorem.sentence(1),
rID: faker.lorem.sentence(1),
rating: faker.lorem.sentence(1),
description: faker.lorem.sentence(1),
department: faker.lorem.sentence(1),
specialization: faker.lorem.sentence(1),
profileLink: faker.lorem.sentence(1),
profilePhoto: faker.lorem.sentence(1),
bannerPhoto: faker.lorem.sentence(1),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
