export const forgotPasswordTemplate = (password: string) => {
  return `
      <div style='border: 1px solid #ccc; padding: 16px'>
        <p>Here is your new password <strong>${password}</strong></p>
      </div>
    `;
};
