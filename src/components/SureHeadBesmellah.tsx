import React from 'react'

const SureHeadBesmellah = ({ name, type, index, sureNUmber }: any) => {
  console.log(name, type);

  return (
    <div>
      بِسۡمِ اللّٰهِ الرَّحۡمٰنِ الرَّحٖیمِ<br />
      {name} {type}
    </div>
  )
}

export default SureHeadBesmellah