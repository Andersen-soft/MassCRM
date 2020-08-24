export const download = (
  content: any,
  filename: string,
  contentType: string
) => {
  const a = document.createElement('a');
  const blob = new Blob([content], {
    type: contentType || 'application/octet-stream'
  });
  a.href = window.URL.createObjectURL(blob);
  a.download = filename;
  a.click();
};
