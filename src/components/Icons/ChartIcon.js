const ChartIcon = (props) => {
  return (
    <svg
      width="1.4vw"
      height="2.8vh"
      viewBox="0 0 24 24"
      fill="none"
      style={{ cursor: "pointer" }}
      onClick={props.onClick}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 10L8 16"
        stroke="#109CF1"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 12V16"
        stroke="#109CF1"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 8V16"
        stroke="#109CF1"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect
        x="3"
        y="4"
        width="18"
        height="16"
        rx="2"
        stroke="#109CF1"
        strokeWidth="2"
      />
    </svg>
  );
};

export default ChartIcon;
