import * as React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { NextPage } from 'next'
import { GetServerSideProps } from 'next'
import { ParsedUrlQuery } from 'querystring'
import Skeleton from 'react-loading-skeleton'
import UserContext from 'helpers/UserContext'

import {
  RecipeType,
  RecipeStepType,
  RECIPE_BY_USERNAME_AND_HANDLE,
  IngredientType,
} from 'requests/recipes'
import { toMixedNumber } from 'helpers/methods'
import client from 'requests/client'

const IMAGE = require('../../images/icons/add.svg')
const TIME = require('../../images/icons/alarm-clock.svg')
const SERVINGS = require('../../images/icons/hot-food.svg')
const PROFILE = require('../../images/chef-rj.svg')

const minutesToTime = (totalMinutes: number) => {
  return { hours: Math.floor(totalMinutes / 60), minutes: totalMinutes % 60 }
}

interface RecipeProps {
  recipe: RecipeType
}

interface StepProps {
  step: RecipeStepType
  activeStep: number
  updateActiveStep: (stepNum?: number) => void
}

const Ingredient: React.FC<{ ingredient: IngredientType }> = ({
  ingredient,
}) => {
  return (
    <div className="grid grid-cols-6">
      <span className="col-span-3 border-black border-b-2">
        {ingredient.ingredientInfo.name}
      </span>
      <span className="">{ingredient.quantity}</span>
      <span className="col-span-2">{ingredient.unit.name}</span>
    </div>
  )
}

const Step: React.FC<StepProps> = ({ step, activeStep, updateActiveStep }) => {
  const { stepTitle, ingredients, additionalInfo, stepNum } = step || {}

  return (
    <React.Fragment>
      {stepNum !== activeStep ? (
        <div
          className="hover:scale-95 transform ease-in duration-200 w-full my-2 cursor-pointer "
          onClick={() => updateActiveStep(stepNum)}
        >
          <div className="grid grid-cols-5 border-black border border-b-2 text-xl p-4 rounded-lg ">
            <span className=" text-2xl  text-center m-auto border-black border-b-2">
              {stepNum + 1}
            </span>
            <span className="col-span-4 bg-white  rounded m-1">
              {stepTitle}
            </span>
          </div>
        </div>
      ) : (
        <div className="w-full my-2">
          <div className="grid grid-rows-2 col-span-2">
            <span className="text-4xl" onClick={() => updateActiveStep()}>
              Step {stepNum + 1}:
            </span>
            <div>{stepTitle}</div>
          </div>
          <div>
            {ingredients.map((ing) => (
              <Ingredient ingredient={ing} />
            ))}
          </div>
          <div className="w-full h-full border-black border rounded p-2">
            {additionalInfo}
          </div>
        </div>
      )}
    </React.Fragment>
  )
}

const RecipePage: NextPage<RecipeProps> = (props) => {
  const { recipe } = props
  const {
    by,
    description,
    handle,
    id,
    steps,
    servings,
    title,
    recipeTime,
    ingredients,
  } = recipe?.result || {}
  const { username } = by || {}

  const [onOwnRecipe, setOnOwnRecipe] = React.useState(false)
  const [activeStep, setActiveStep] = React.useState(-1)
  const { currentUserInfo } = React.useContext(UserContext)
  if (
    currentUserInfo &&
    !onOwnRecipe &&
    currentUserInfo.me.username == username
  ) {
    setOnOwnRecipe(true)
  }

  const updateActiveStep = (stepNum?: number) => {
    setActiveStep(stepNum || -1)
  }

  const pageTitle = `${title || 'a recipe'}, by ${
    by ? by.username : 'rj'
  } - RecipeJoiner`
  const pageDescription = description
  return (
    <React.Fragment>
      {recipe && (
        <Head>
          {/* Give the title a key so that it's not duplicated - this allows me to change the page title on other pages */}
          <title key="title">{pageTitle}</title>
          <meta charSet="utf-8" />
          <meta key="description" name="description" content={description} />
          {/* OpenGraph tags */}
          <meta
            key="og:url"
            property="og:url"
            content={`${process.env.NEXT_PUBLIC_BASE_URL}/users/${username}/${handle}`}
          />
          <meta key="og:title" property="og:title" content={pageTitle} />
          <meta
            key="og:description"
            property="og:description"
            content={pageDescription}
          />
          {/* OpenGraph tags end */}
        </Head>
      )}
      <div className="max-w-xl lg:my-8 mx-auto font-mono">
        <div className=" mx-auto mt-1 p-6 bg-white rounded-lg shadow-xl border-black border">
          <div className="m-2 mb-8 ">
            <div
              className=" bg-transparent w-full text-5xl text-gray-700  py-1 leading-tight focus:outline-none  border-b-2 border-black"
              onClick={() => updateActiveStep()}
            >
              {title}
            </div>
            <div className="inline-flex items-center mt-3">
              <Link href="/[username]" as={`/${username}`}>
                <img
                  src={PROFILE}
                  className="h-8 m-auto cursor-pointer rounded-full"
                />
                <span className="mx-2">
                  {by.username || <Skeleton width={40} />}
                </span>
              </Link>
              {onOwnRecipe ? (
                <div className="m-2">
                  <Link
                    href="/[username]/[recipehandle]/edit"
                    as={`/${username}/${handle}/edit`}
                  >
                    <a className="w-28 m-auto btn">Edit</a>
                  </Link>
                </div>
              ) : null}
            </div>
          </div>
          {activeStep < 0 ? (
            <React.Fragment>
              <div className=" grid items-center  p-2 w-full h-full m-auto">
                <img className="p-4  m-auto" src={IMAGE} />
              </div>
              <div className=" w-full my-4 h-full rounded ">
                <div className="h-full w-full text-2xl text-gray-700   p-4 ">
                  {description}
                </div>
              </div>
              <div className="grid grid-cols-2">
                <div className="grid grid-rows-2 p-2 rounded text-center text-xs ">
                  <img
                    src={TIME}
                    className="h-8 m-auto cursor-pointer rounded"
                  />
                  <div className="w-full text-center grid grid-cols-2 justify-center rounded">
                    <div className="text-xl w-full m-auto border border-black text-center col-span-2  grid grid-cols-2 rounded">
                      <span>{minutesToTime(recipeTime).hours || '0'}</span>
                      <span>{minutesToTime(recipeTime).minutes || '0'}</span>
                    </div>
                    <span className="text-xs">Hour</span>
                    <span className="text-xs">Minutes</span>
                  </div>
                </div>
                <div className="grid  grid-rows-2 p-2 rounded text-center text-xs ">
                  <img
                    src={SERVINGS}
                    className="h-8 m-auto cursor-pointer rounded"
                  />
                  <div className="w-full text-center justify-center rounded">
                    <div className="text-xl w-full m-auto border border-black text-center  rounded">
                      {servings || <Skeleton width={40} />}
                    </div>
                    Servings
                  </div>
                </div>
              </div>
              <div className="border-black border p-2 my-2">
                {ingredients.map((ing: IngredientType) => (
                  <Ingredient ingredient={ing} />
                ))}
              </div>
            </React.Fragment>
          ) : null}
          {steps.map((step) => (
            <Step
              step={step}
              activeStep={activeStep}
              updateActiveStep={updateActiveStep}
            />
          ))}
        </div>
      </div>
      {/* {username && handle && (
        <RecipeComments username={username} handle={handle} />
      )} */}
    </React.Fragment>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const { params } = ctx

    const username = params?.username
    const recipehandle = params?.recipehandle

    const token = process.env.NEXT_PUBLIC_RJ_API_TOKEN || ''

    const data: RecipeType = await client
      .query({
        query: RECIPE_BY_USERNAME_AND_HANDLE,
        variables: {
          username: username,
          handle: recipehandle,
        },
        context: {
          // example of setting the headers with context per operation
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
      })
      .then((res) => {
        return res.data
      })

    return { props: { recipe: data } }
  } catch (err) {
    // handle error - probably put honeybadger here or something
    return { props: { recipe: null } }
  }
}

export default RecipePage
