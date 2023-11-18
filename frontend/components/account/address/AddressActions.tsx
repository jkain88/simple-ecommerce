'use client'

import { Button } from '@/components/ui/button'
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react'
import Link from 'next/link'
import React from 'react'

type Props = {
  id: number
}

const AddressActions: React.FC<Props> = ({ id }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const onSubmitDelete = (onClose: () => void) => {
    console.log('SUBMIT')
    onClose()
  }
  return (
    <div className="mt-2 flex flex-col gap-1">
      <Link href={`/account/addresses/${id}`} className="flex">
        <Button
          size="sm"
          className="w-full bg-gray-200 px-10 text-sm font-semibold text-black hover:bg-gray-500"
        >
          Edit
        </Button>
      </Link>
      <Button
        size="sm"
        className="w-full bg-gray-200 px-10 text-sm font-semibold text-black hover:bg-gray-500"
        onClick={onOpen}
      >
        Delete
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Delete Address
              </ModalHeader>
              <ModalBody>
                <p>Are you sure you want to delete this address?</p>
              </ModalBody>
              <ModalFooter>
                <Button onClick={() => onSubmitDelete(onClose)}>Submit</Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Button
        size="sm"
        className="bg-gray-200 px-10 text-sm font-semibold text-black hover:bg-gray-500"
      >
        Set as Default
      </Button>
    </div>
  )
}

export default AddressActions
