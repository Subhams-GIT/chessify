import useDevice from "../useDevice";

const page = async () => {
  const device = await useDevice();
  console.log(device);
  return <div>

  </div>;
};

export default page;
