import React, { FC, useRef, useEffect } from "react"
import get from "lodash/get"
import { select } from "d3-selection"
import { line } from "d3-shape"
import { scaleLinear } from "d3-scale"
import { extent } from "d3-array"
import styles from "./line.module.css"
import useResizeObserver from "../../../hooks/use-resize-observer"
import { useSelector } from "react-redux"
import { getScoreHistory } from "../../../state/game/game.selectors"

const LineChart: FC = () => {
  const data = useSelector(getScoreHistory)
  // const data = [10000, 9500, 9000, 9500, 10000, 10500, 11000, 10500]
  const wrapperRef = useRef(null)
  const svgRef = useRef(null)

  const dimensions = useResizeObserver(wrapperRef)
  const height = get(dimensions, "height", 0)
  const width = get(dimensions, "width", 0)

  useEffect(() => {
    if (data.length < 2) {
      return
    }

    const scaleX = scaleLinear()
      .domain([0, data.length - 1])
      .range([0, width])

    const scaleY = scaleLinear()
      .domain(extent(data) as number[])
      .range([height, 0])

    const svg = select(svgRef.current)
    const myLine = line()
      .x((d, idx) => scaleX(idx))
      .y((d: any) => scaleY(d))

    svg
      .selectAll("path")
      .data([data])
      .join("path")
      .attr("d", (d: any) => myLine(d))
      .attr("class", styles.graph)

    svg
      .selectAll("circle")
      .data(data)
      .join("circle")
      .attr("cx", (d, idx) => scaleX(idx))
      .attr("cy", (d: any) => scaleY(d))
      .attr("r", 4)
      .attr("class", styles.dot)
  }, [data, height, width])

  return (
    <figure className={styles.component} ref={wrapperRef}>
      <svg className={styles.svg} ref={svgRef} />
    </figure>
  )
}

export default LineChart
