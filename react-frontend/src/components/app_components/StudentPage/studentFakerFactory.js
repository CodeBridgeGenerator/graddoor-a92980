
import { faker } from "@faker-js/faker";
export default (user,count) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
uID: faker.lorem.sentence(""),
sID: faker.lorem.sentence(1),
rID: faker.lorem.sentence(1),
fieldOfInterest: faker.lorem.sentence(""),
projectID: faker.lorem.sentence(""),
projectTitle: faker.lorem.sentence(""),
projectOverview: faker.lorem.sentence(""),
projectField: faker.lorem.sentence(""),
profilePhoto: faker.lorem.sentence(1),
bannerPhoto: faker.lorem.sentence(1),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
