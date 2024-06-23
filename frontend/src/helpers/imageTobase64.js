const imageTobase64 = async (image) => {
  const render = new FileReader();
  render.readAsDataURL(image);

  const data = await new Promise((resolev, reject) => {
    render.onload = () => resolev(render.result);

    render.onerror = (error) => reject(error);
  });

  return data;
}

export default imageTobase64;
