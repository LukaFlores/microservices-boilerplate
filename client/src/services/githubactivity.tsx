import axios from 'axios';
interface usernames {
  usernames: string[];
}
export const getGithubActivity = async (usernames: usernames) => {
  const response = await axios.post(
    process.env.REACT_APP_URL + '/api/testsrv/githubactivity',
    usernames,
  );
  console.log(response.data);
  return response.data;
};
