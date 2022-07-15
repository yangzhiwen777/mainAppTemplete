export default {
  namespace: 'products',
  state: {
    name: 123,
    userModel: () => {
      const user = {
        username: 'umi',
      };

      return {
        namespace: 'products',
        user,
      };
    },
  },
};
// src/models/userModel.ts
// export default
