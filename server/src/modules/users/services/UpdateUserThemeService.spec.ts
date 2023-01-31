import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import UpdateUserThemeService from './UpdateUserThemeService';

let fakeUserRepository: FakeUserRepository;
let updateUserThemeService: UpdateUserThemeService;

describe('UpdateUserTheme', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();

    updateUserThemeService = new UpdateUserThemeService(fakeUserRepository);
  });

  it('should be able to change user color theme', async () => {
    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'oi@oi.com.br',
      password: '123123',
    });

    await updateUserThemeService.execute({
      user_id: user.id,
    });

    expect(user.theme).toBe('light');
  });
});
