import AppError from '@shared/errors/AppError';

import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

import CreateUserService from './CreateUserServices';

let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let fakeCacheProvider: FakeCacheProvider;

let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeCacheProvider = new FakeCacheProvider();

    createUser = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
      fakeCacheProvider,
    );
  });
  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'John Doe',
      email: 'oi@oi.com.br',
      password: '123123',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create user with same email', async () => {
    await createUser.execute({
      name: 'John Doe',
      email: 'oi@oi.com.br',
      password: '123123',
    });

    await expect(
      createUser.execute({
        name: 'John Doe',
        email: 'oi@oi.com.br',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
