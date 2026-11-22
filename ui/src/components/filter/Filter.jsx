import Parser from "html-react-parser"
import Constants from "../Constants"

const Filter = ({ name, items, applyFilter, currentFilter }) => {
	const { MAPPING } = Constants()
	const keys = Object.keys(items)

	return (
		<div className="filter-info">
			<div className="filter-title">
				{MAPPING[name] ? MAPPING[name] : name}
			</div>
			{keys.map((key, index) => {
				let filterClass =
					currentFilter && currentFilter[name] !== key
						? "item-info"
						: name == "sort"
						? "item-info active-item-sort"
						: "item-info active-item"

				return (
					<div
						key={index}
						id={`${name}-${key}`}
						className={filterClass}
						onClick={applyFilter}
					>
						<div className="item-name">
							{MAPPING[key] ? Parser(MAPPING[key]) : key}
						</div>
						<div className="item-count">{items[key]}</div>
					</div>
				)
			})}
		</div>
	)
}

export default Filter
