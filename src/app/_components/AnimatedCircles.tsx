export default function AnimatedCircles() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
      <circle
        fill="#6262CC"
        stroke="#6262CC"
        strokeWidth="8"
        r="15"
        cx="40"
        cy="100"
      >
        <animate
          attributeName="opacity"
          calcMode="spline"
          dur="2s"
          values="1;0;1"
          keySplines=".5 0 .5 1;.5 0 .5 1"
          repeatCount="indefinite"
          begin="-.4s"
        />
      </circle>
      <circle
        fill="#6262CC"
        stroke="#6262CC"
        strokeWidth="8"
        r="15"
        cx="100"
        cy="100"
      >
        <animate
          attributeName="opacity"
          calcMode="spline"
          dur="2s"
          values="1;0;1"
          keySplines=".5 0 .5 1;.5 0 .5 1"
          repeatCount="indefinite"
          begin="-.2s"
        />
      </circle>
      <circle
        fill="#6262CC"
        stroke="#6262CC"
        strokeWidth="8"
        r="15"
        cx="160"
        cy="100"
      >
        <animate
          attributeName="opacity"
          calcMode="spline"
          dur="2s"
          values="1;0;1"
          keySplines=".5 0 .5 1;.5 0 .5 1"
          repeatCount="indefinite"
          begin="0s"
        />
      </circle>
    </svg>
  );
}
