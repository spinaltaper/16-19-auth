'use strict';

import faker from 'faker';
import Account from '../../model/account';

const pCreateAccountMock=()=>{
    const mock={};
    mock.request={
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password(5),
    };
    return Account.create(mock.request.username,mock.request.email,mock.request.password)
        .then((account)=>{
            mock.
        })
}