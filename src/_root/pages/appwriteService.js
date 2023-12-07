import { Appwrite } from 'appwrite';

const client = new Appwrite();

client
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('6563102f4de53e4c365b');

export const getUserProfile = async () => {
  try {
    const userId = client.account.get().$id;
    const response = await client.database.listDocuments('users', ['*']);
    const user = response.documents.find((user) => user.userId === userId);
    return user || {};
  } catch (error) {
    throw error;
  }
};

export const incrementFollowersCount = async () => {
  try {
    const userId = client.account.get().$id;
    const response = await client.database.listDocuments('users', ['*']);
    const user = response.documents.find((user) => user.userId === userId);

    if (!user) {
      throw new Error('User not found');
    }

    const updatedUser = {
      ...user,
      followersCount: user.followersCount + 1,
    };

    await client.database.updateDocument('users', user.$id, updatedUser);

    return updatedUser;
  } catch (error) {
    throw error;
  }
};
