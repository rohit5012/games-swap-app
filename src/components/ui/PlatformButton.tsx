export default function PlatformButton(props: {
  name: string;
  platforms: string | null;
  setPlatforms: React.Dispatch<React.SetStateAction<string | null>>;
}) {
  const handleClick = () => {
    let platformId = null;
    props.name === "Switch"
      ? (platformId = "7")
      : props.name === "PlayStation 5"
      ? (platformId = "187")
      : props.name === "Xbox Series S | X"
      ? (platformId = "186")
      : (platformId = null);
    props.setPlatforms(platformId);
  };

  return (
    <button onClick={handleClick} className={`gray-btn`}>
      {props.name}
    </button>
  );
}
