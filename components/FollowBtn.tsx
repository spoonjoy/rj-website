import Link from 'next/link'

type FollowBtnProps = {}

const FollowBtn: React.FC<FollowBtnProps> = ({}) => {
  return (
    <div>
      <button className="h-8 py-2 px-4 border border-gray-300 rounded bg-white hover:bg-gray-200">
        <svg
          className="h-full text-gray-900 hover:text-gray-700 fill-current"
          viewBox="0 0 193 102"
          version="1.1"
        >
          <g id="Page-1" stroke="none" strokeWidth="1" fillRule="evenodd">
            <g id="UI-Icons" transform="translate(-89.000000, -506.000000)">
              <path
                d="M161,565 C173.702549,565 184,575.297451 184,588 L184,608 L89,608 L89,588 C89,575.297451 99.2974508,565 112,565 L161,565 Z M275.708892,531.76167 L281.365747,537.418525 L226.918525,591.865747 L198.634253,563.581475 L204.291108,557.924621 L226.918525,580.552038 L275.708892,531.76167 Z M136.5,506 C150.583261,506 162,517.416739 162,531.5 C162,545.583261 150.583261,557 136.5,557 C122.416739,557 111,545.583261 111,531.5 C111,517.416739 122.416739,506 136.5,506 Z"
                id="following"
              ></path>
            </g>
          </g>
        </svg>
      </button>
    </div>
  )
}

export default FollowBtn
