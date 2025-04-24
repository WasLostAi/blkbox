import type React from "react"
import { cn } from "@/lib/utils"

interface DataGridProps {
  data: any[]
  columns: {
    key: string
    label: string
    render?: (item: any) => React.ReactNode
  }[]
  className?: string
}

const DataGrid: React.FC<DataGridProps> = ({ data, columns, className }) => {
  return (
    <div className={cn("overflow-x-auto", className)}>
      <table className="min-w-full divide-y divide-zinc-700">
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider"
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-transparent divide-y divide-zinc-700">
          {data.map((item) => (
            <tr key={item.id}>
              {columns.map((column) => (
                <td key={`${item.id}-${column.key}`} className="px-6 py-4 whitespace-nowrap">
                  {column.render ? column.render(item) : item[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default DataGrid
