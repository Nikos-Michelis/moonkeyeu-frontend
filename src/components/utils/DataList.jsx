
const DataList = ({data}) => {
  return (
      <div className="datalist margin-block-4">
          <ul>
              {data.map((item, index) => (
                  <li key={index}>{item}</li>
              ))}
          </ul>
      </div>
  )
}

export default DataList;