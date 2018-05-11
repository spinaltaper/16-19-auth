'use strict';

import faker from 'faker';
import Profile from '../../model/profile';
import { pCreateAccountMock, pRemoveAccountMock } from './account-mock';

const pCreateAccountMock=()=>{
    const resultMock={};

    return pCreateAccountMock()
    .then((accountSetMock)=>{
        resultMock.accountSetMock=accountSetMock;
        return new Profile({
            bio:faker.lorem.words(10),
            avatar: faker.random.image(),
            lastName: faker.name.lastName(),
            firstName: faker.name.firstName(),
            account: accountSetMock.account._id,
        }).save()
    })
    .then((profile)=>{
        resultMock.profile=profile;
        return resultMock;
    });
};