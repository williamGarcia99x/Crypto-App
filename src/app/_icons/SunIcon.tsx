function SunIcon({ fillColor }: { fillColor: string }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 17 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.47201 12.3337C10.8652 12.3337 12.8053 10.3936 12.8053 8.00033C12.8053 5.60709 10.8652 3.66699 8.47201 3.66699C6.07877 3.66699 4.13867 5.60709 4.13867 8.00033C4.13867 10.3936 6.07877 12.3337 8.47201 12.3337Z"
        stroke={fillColor}
        strokeOpacity="1" // Replaced `stroke-opacity` with `strokeOpacity`
        strokeLinecap="round" // Replaced `stroke-linecap` with `strokeLinecap`
        strokeLinejoin="round" // Replaced `stroke-linejoin` with `strokeLinejoin`
      />
      <path
        d="M13.2333 12.7597L13.1466 12.673M13.1466 3.32634L13.2333 3.23967L13.1466 3.32634ZM3.71331 12.7597L3.79997 12.673L3.71331 12.7597ZM8.47331 1.38634V1.33301V1.38634ZM8.47331 14.6663V14.613V14.6663ZM1.85997 7.99967H1.80664H1.85997ZM15.14 7.99967H15.0866H15.14ZM3.79997 3.32634L3.71331 3.23967L3.79997 3.32634Z"
        stroke={fillColor}
        strokeOpacity="1" // Replaced `stroke-opacity` with `strokeOpacity`
        strokeLinecap="round" // Replaced `stroke-linecap` with `strokeLinecap`
        strokeLinejoin="round" // Replaced `stroke-linejoin` with `strokeLinejoin`
      />
    </svg>
  );
}

export default SunIcon;
