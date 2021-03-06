import React from 'react'
import client from 'requests/client'
import {
  UserFollowChangeVars,
  UserFollowChangeReturnType,
  FOLLOW,
  UNFOLLOW,
} from 'requests/users'
import { getToken } from 'helpers/auth'
import UserContext from 'helpers/UserContext'

interface UnFollowBtnProps {
  unFollowUser: () => void
}

const UnFollowBtn: React.FC<UnFollowBtnProps> = ({ unFollowUser }) => {
  return (
    <button onClick={unFollowUser} className="btn w-16">
      <svg
        className="h-full w-8 m-auto text-gray-900 hover:text-gray-700 fill-current"
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
  )
}

interface FollowBtnProps {
  followUser: () => void
}

const FollowBtn: React.FC<FollowBtnProps> = ({ followUser }) => {
  return (
    <button onClick={followUser} className="btn-blue w-24">
      Follow
    </button>
  )
}

interface FollowChangeBtnProps {
  followingStatus: boolean | null
  setFollowingStatus: (status: boolean) => void
  followingCountStat: number
  setFollowingCountStat: (amount: number) => void
  followerCountStat: number
  setFollowerCountStat: (amount: number) => void
  username: string
}

const FollowChangeBtn: React.FC<FollowChangeBtnProps> = ({
  followingStatus,
  setFollowingStatus,
  followingCountStat,
  setFollowingCountStat,
  followerCountStat,
  setFollowerCountStat,
  username,
}) => {
  console.log('followers:', followerCountStat)
  const [currentFollowingCount, setCurrentFollowingCount] = React.useState(
    followingCountStat
  )
  const [currentFollowerCount, setCurrentFollowerCount] = React.useState(
    followerCountStat
  )
  console.log('currentFollowerCount', currentFollowerCount)
  const variables: UserFollowChangeVars = {
    username: username,
  }
  const followUser = () => {
    client
      .mutate({
        mutation: FOLLOW,
        variables: variables,
        context: {
          headers: {
            authorization: `Bearer ${getToken()}`,
          },
        },
      })
      .then((res) => {
        const { data }: { data?: UserFollowChangeReturnType } = res || {}
        if (data && data.result.user) {
          setFollowingStatus(data.result.user.areFollowing)

          //if the current *logged-in* user is on their OWN profile, increment their following count
          if (
            currentUserInfo &&
            window.location.pathname.includes(currentUserInfo?.me.username)
          ) {
            const newFollowingCount = currentFollowingCount + 1
            setFollowingCountStat(newFollowingCount)
            setCurrentFollowingCount(newFollowingCount)
            //if the user *being unfollowed* from their own profile, increment their follower count
          } else if (window.location.pathname.includes(username)) {
            const newFollowerCount = followerCountStat + 1
            setFollowerCountStat(newFollowerCount)
            setCurrentFollowerCount(newFollowerCount)
          }
        }
      })
  }

  const unFollowUser = () => {
    client
      .mutate({
        mutation: UNFOLLOW,
        variables: variables,
        context: {
          headers: {
            authorization: `Bearer ${getToken()}`,
          },
        },
      })
      .then((res) => {
        const { data }: { data?: UserFollowChangeReturnType } = res || {}
        if (data && data.result.user) {
          setFollowingStatus(data.result.user.areFollowing)

          //if the current *logged-in* user is on their OWN profile, decrement their following count
          if (
            currentUserInfo &&
            window.location.pathname.includes(currentUserInfo?.me.username)
          ) {
            const newFollowingCount = currentFollowingCount - 1
            setFollowingCountStat(newFollowingCount)
            setCurrentFollowingCount(newFollowingCount)
            //if the user *being unfollowed* from their own profile, decrement their follower count
          } else if (window.location.pathname.includes(username)) {
            const newFollowerCount = followerCountStat - 1
            setFollowerCountStat(newFollowerCount)
            setCurrentFollowerCount(newFollowerCount)
          }
        }
      })
  }

  const { currentUserInfo } = React.useContext(UserContext)

  // will be true if the passed-in username is the same as for the current user
  // this is for not showing a 'follow' button next to the current user - can't follow self
  const selfBtn = !!currentUserInfo && currentUserInfo.me.username === username

  // followingStatus will be null if no current user
  if (followingStatus == true && !selfBtn) {
    return <UnFollowBtn unFollowUser={unFollowUser} />
  } else if (followingStatus == false && !selfBtn) {
    return <FollowBtn followUser={followUser} />
  } else {
    return null
  }
}

export default FollowChangeBtn
