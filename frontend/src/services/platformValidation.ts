// Validate usernames
export const validateTwitterUsername = async (username?: string) => {
  console.log("Validating Twitter username:", username);
  // TODO : Need a server for cors issues
  // const response = await fetch(
  //   `https://api.twitter.com/2/users/by/username/${username}`,
  //   {
  //     headers: {
  //       Authorization: `Bearer YOUR_TWITTER_BEARER_TOKEN`,
  //     },
  //   }
  // )
  // return response.ok
  return true;
};

export const validateGitHubUsername = async (
  username?: string
): Promise<boolean> => {
  return true;
  const response = await fetch(`https://api.github.com/users/${username}`);
  return response.ok;
};
