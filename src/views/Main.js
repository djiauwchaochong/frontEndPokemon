import Welcome from "../components/Welcome"
import { useSelector, useDispatch } from 'react-redux'
import React from "react"
import { fetchData, fetchDataDetail } from "../store/action";
import Progress from 'react-progressbar'

export default function Main () {
  const [openTab, setOpenTab] = React.useState(1);
  const { data, dataDetail, error, loading } = useSelector((state) => state)
  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(fetchData())
  }, [dispatch])

  if (loading === true) {
    return (
      <div>Loading...</div>
    )
  }

  if (error === true) {
    return (
      <div>Error...</div>
    )
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }  

  function pad(n, length) {
    var len = length - (''+n).length;
    return (len > 0 ? new Array(++len).join('0') : '') + n
  }  

  return (
    <div className="flex flex-col h-screen">
      <Welcome />
      {/* SELECT POKEMON */}
      <div className="flex flex-row bg-gray-200 flex-grow">
        <div className="flex flex-col w-5/12 p-10 bg-white">
          <div className="h-4 flex items-center text-gray-800 text-2xl mb-4 font-extrabold italic">
            Pokedex
          </div>
          <div className="flex flex-row justify-start flex-wrap">
            
            {
              data.map(el => {
                return (
                  <div className="w-1/2 p-4 rounded-3xl">
                    <div className={
                      el.types[0].type.name === "grass" ? "rounded-3xl h-40 p-4 bg-gradient-to-r from-green-400 to-green-600 flex-grow cursor-pointer" 
                      : el.types[0].type.name === "fire" ? "rounded-3xl h-40 p-4 bg-gradient-to-r from-red-400 to-red-600 flex-grow cursor-pointer"
                      : "rounded-3xl h-40 p-4 bg-gradient-to-r from-blue-400 to-blue-600 flex-grow cursor-pointer"
                    } onClick={() => dispatch(fetchDataDetail(el.id))} >
                      <div className="flex flex-row">
                        <div className="flex flex-col text-white w-2/5">
                          <div className="font-bold">{capitalizeFirstLetter(el.species.name)}</div>
                          <div className="flex flex-col ml-2 mt-2 text-center mx-1">
                            {
                              el.types.map(el => {
                                return (
                                  <div className="my-1 bg-white rounded-xl bg-opacity-40">{capitalizeFirstLetter(el.type.name)}</div>
                                )
                              })
                            }
                          </div>
                        </div>
                        <div className="w-3/5">
                          <img alt="img" className="object-contain h-32 w-full" src={el.sprites.other["official-artwork"]["front_default"]}/>
                        </div>
                      </div>
                    </div>
                  </div>    
                )
              })
            }

          </div>
        </div>

      {/* SHOW POKEMON */}
        {
          Object.keys(dataDetail).length === 0
          ? (
            <div></div>
          )
          : (
          <div className="flex-1 p-6 py-10 w-7/12">
            <div className={
              dataDetail.types[0].type.name === "grass" ? "bg-gradient-to-r rounded-3xl relative from-green-600 to-green-400"
              : dataDetail.types[0].type.name === "fire" ? "bg-gradient-to-r rounded-3xl relative from-red-600 to-red-400"
              : "bg-gradient-to-r rounded-3xl relative from-blue-600 to-blue-400"
            }>
  
              <div className="w-full h-96 absolute top-12 flex justify-center ">
                <img alt="" className="h-full object-cover" src={dataDetail.sprites.other["official-artwork"]["front_default"]}/>
              </div>
  
              <div className="text-white flex flex-row h-28 p-8 py-20">
                <div className="w-11/12 mx-2 flex flex-col justify-center">
                  <div className="mx-5 font-bold text-4xl h-10">{capitalizeFirstLetter(dataDetail.name)}</div>
                  <div className="mx-5 flex flex-row items-center h-10">
                    {
                      dataDetail.types.map(el => {
                        return (
                          <div className="mx-1 my-1 p-1 bg-white rounded-xl bg-opacity-40">{el.type.name}</div>
                        )
                      })
                    }
                  </div>
                </div>
                <div className="w-1/12 mx-2 flex items-center text-2xl font-semibold justify-end mr-5">#{pad(dataDetail.id, 3)}</div>
              </div>
  
              <div className="bg-white mt-52 h-96 rounded-3xl p-16">
                <div className="flex flex-row justify-around mx-4 font-semibold">
                  <div className={
                    "cursor-pointer text-gray-600 border-b-4 pb-4 flex-grow text-center " +
                    ( openTab === 1
                      ? "border-gray-600"
                      : "border-gray-200"
                    )
                  } onClick={e => {
                    e.preventDefault()
                    setOpenTab(1)
                  }} >About</div>
                  <div className={
                    "cursor-pointer text-gray-600 border-b-4 pb-4 flex-grow text-center " +
                    ( openTab === 2
                      ? "border-gray-600"
                      : "border-gray-200"
                    )
                  } onClick={e => {
                    e.preventDefault()
                    setOpenTab(2)
                  }} >Base Stats</div>
                  <div className={
                    "cursor-pointer text-gray-600 border-b-4 pb-4 flex-grow text-center " +
                    ( openTab === 3
                      ? "border-gray-600"
                      : "border-gray-200"
                    )
                  } onClick={e => {
                    e.preventDefault()
                    setOpenTab(3)
                  }} >Evolution</div>
                  <div className={
                    "cursor-pointer text-gray-600 border-b-4 pb-4 flex-grow text-center " +
                    ( openTab === 4
                      ? "border-gray-600"
                      : "border-gray-200"
                    )
                  } onClick={e => {
                    e.preventDefault()
                    setOpenTab(4)
                  }} >Moves</div>
                </div>
  
                <div>
                  {/* ABOUT */}
                  <div className={
                    "mx-4 mt-4 flex flex-col " +
                    ( openTab === 1
                      ? "bloack"
                      : "hidden"
                    )
                  }>
                    <div className="flex flex-row my-2">
                      <div className="w-1/6 text-gray-400 font-semibold text-base">
                        Height
                      </div>
                      <div className="w-5/6 font-medium">
                        {dataDetail.height}
                      </div>
                    </div>
                    <div className="flex flex-row my-2">
                      <div className="w-1/6 text-gray-400 font-semibold text-base">
                        Weight
                      </div>
                      <div className="w-5/6 font-medium">
                        {dataDetail.weight}
                      </div>
                    </div>
                    <div className="flex flex-row my-2">
                      <div className="w-1/6 text-gray-400 font-semibold text-base">
                        Abilities
                      </div>
                      <div className="w-5/6">
                        {
                          dataDetail.abilities.map(el => {
                            return (
                              <span className="text-gray-800 font-medium">{capitalizeFirstLetter(el.ability.name)} </span>
                            )
                          })
                        }
                      </div>
                    </div>
                  </div>
                  
                  {/* BASE STATS */}
                  <div className={
                    "mx-4 mt-4 flex flex-col " +
                      ( openTab === 2
                        ? "block"
                        : "hidden"
                      )
                    }>
                      <div className="flex flex-row my-1 items-center">
                        <div className="w-2/12">
                          HP
                        </div>
                        <div className="w-1/12">
                          {dataDetail.stats[0].base_stat}
                        </div>
                        <div class="relative pt-1 w-9/12">
                          <div class="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                            <div style={{
                              width: dataDetail.stats[0].base_stat + '%'
                            }} class={
                              dataDetail.types[0].type.name === "grass" ? "shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"
                              : dataDetail.types[0].type.name === "fire" ? "shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500"
                              : "shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                            }></div>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-row my-1 items-center">
                        <div className="w-2/12">
                          Attack
                        </div>
                        <div className="w-1/12">
                          {dataDetail.stats[1].base_stat}
                        </div>
                        <div class="relative pt-1 w-9/12">
                          <div class="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                            <div style={{
                              width: dataDetail.stats[1].base_stat + '%'
                            }} class={
                              dataDetail.types[0].type.name === "grass" ? "shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"
                              : dataDetail.types[0].type.name === "fire" ? "shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500"
                              : "shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                            }></div>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-row my-1 items-center">
                        <div className="w-2/12">
                          Defense
                        </div>
                        <div className="w-1/12">
                          {dataDetail.stats[2].base_stat}
                        </div>
                        <div class="relative pt-1 w-9/12">
                          <div class="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                            <div style={{
                              width: dataDetail.stats[2].base_stat + '%'
                            }} class={
                              dataDetail.types[0].type.name === "grass" ? "shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"
                              : dataDetail.types[0].type.name === "fire" ? "shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500"
                              : "shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                            }></div>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-row my-1 items-center">
                        <div className="w-2/12">
                          Sp. Attack
                        </div>
                        <div className="w-1/12">
                          {dataDetail.stats[3].base_stat}
                        </div>
                        <div class="relative pt-1 w-9/12">
                          <div class="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                            <div style={{
                              width: dataDetail.stats[3].base_stat + '%'
                            }} class={
                              dataDetail.types[0].type.name === "grass" ? "shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"
                              : dataDetail.types[0].type.name === "fire" ? "shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500"
                              : "shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                            }></div>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-row my-1 items-center">
                        <div className="w-2/12">
                          Sp. Defense
                        </div>
                        <div className="w-1/12">
                          {dataDetail.stats[4].base_stat}
                        </div>
                        <div class="relative pt-1 w-9/12">
                          <div class="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                            <div style={{
                              width: dataDetail.stats[4].base_stat + '%'
                            }} class={
                              dataDetail.types[0].type.name === "grass" ? "shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"
                              : dataDetail.types[0].type.name === "fire" ? "shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500"
                              : "shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                            }></div>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-row my-1 items-center">
                        <div className="w-2/12">
                          Speed
                        </div>
                        <div className="w-1/12">
                          {dataDetail.stats[5].base_stat}
                        </div>
                        <div class="relative pt-1 w-9/12">
                          <div class="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                            <div style={{
                              width: dataDetail.stats[5].base_stat + '%'
                            }} class={
                              dataDetail.types[0].type.name === "grass" ? "shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"
                              : dataDetail.types[0].type.name === "fire" ? "shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500"
                              : "shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                            }></div>
                          </div>
                        </div>
                      </div>
                  </div>
  
                  {/* EVOLUTION */}
                  <div className={
                    "mx-4 mt-4 flex flex-col " +
                      ( openTab === 3
                        ? "block"
                        : "hidden"
                      )
                    }>
                      <div className="text-center italic">EVOLUTION IN DEVELOPMENT</div>
                  </div>
  
                  {/* MOVES */}
                  <div className={
                    "mx-4 mt-4 flex flex-col " +
                      ( openTab === 4
                        ? "block"
                        : "hidden"
                      )
                    }>
                      <div className="text-center italic">MOVES IN DEVELOPMENT</div>
                  </div>
  
                </div>
  
              </div>
            </div>
          </div>
  
          )
        }
      </div>
    </div>
  )
}