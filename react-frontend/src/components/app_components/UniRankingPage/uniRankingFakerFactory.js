
import { faker } from "@faker-js/faker";
export default (user,count) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
rankID: faker.lorem.sentence(1),
uniID: faker.lorem.sentence(1),
rankingType: faker.lorem.sentence(1),
rankingYear: faker.lorem.sentence(1),
position: faker.lorem.sentence(1),
country: faker.lorem.sentence(1),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
