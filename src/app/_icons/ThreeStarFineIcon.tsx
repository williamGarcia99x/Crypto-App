function ThreeStackFineIcon({ fillColor }: { fillColor: string }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 21 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19.5 11L10.5 17L1.5 11M19.5 15L10.5 21L1.5 15M19.5 7L10.5 13L1.5 7L10.5 1L19.5 7Z"
        stroke={fillColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeOpacity="1"
      />
    </svg>
  );
}

export default ThreeStackFineIcon;
