'use client'

import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/react'
import React, { useMemo, useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'

const sortingOptions = [
  {
    id: 1,
    value: 'popularity',
    label: 'Popularity',
  },
  {
    id: 2,
    value: 'rating',
    label: 'Rating',
  },
  {
    id: 3,
    value: 'latest',
    label: 'Latest',
  },
  {
    id: 4,
    value: 'price-low-to-high',
    label: 'Price: low to high',
  },
  {
    id: 5,
    value: 'price-high-to-low',
    label: 'Price: high to low',
  },
]

const SortDropdown: React.FC = () => {
  return (
    <div>
      <Select>
        <SelectTrigger className="w-44">
          <SelectValue placeholder="Sorting options" />
        </SelectTrigger>
        <SelectContent>
          {sortingOptions.map((option) => (
            <SelectItem key={option.id} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

export default SortDropdown
