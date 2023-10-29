'use client'

import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Select,
  SelectItem,
} from '@nextui-org/react'
import React, { useMemo, useState } from 'react'

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
    <div className="w-full max-w-xs">
      <Select label="Default sorting" className="max-w-xs">
        {sortingOptions.map((option) => (
          <SelectItem key={option.id} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </Select>
    </div>
  )
}

export default SortDropdown
