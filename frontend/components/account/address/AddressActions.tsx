'use client'

import { Button } from '@/components/ui/button'
import { Address, Api } from '@/lib/Api'
import { useAddressStore } from '@/store/address'
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react'
import { useMutation } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'

type Props = {
  address: Address
}

const AddressActions: React.FC<Props> = ({ address }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const { data: session } = useSession()
  const addresses = useAddressStore((state) => state.addresses)
  const setAddresses = useAddressStore((state) => state.setAddresses)
  const { mutate: setDefault } = useMutation({
    mutationKey: ['addressSetDefault'],
    mutationFn: async (input: Address) => {
      const api = new Api()
      return api.users.usersAddressesUpdate(address!.id!.toString(), input, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${session?.token}`,
        },
      })
    },
    onSuccess: (data) => {
      setAddresses(
        addresses.map((address) =>
          address.id === data.data.id
            ? data.data
            : { ...address, is_default: false }
        )
      )
    },
  })
  const onSubmitDelete = (onClose: () => void) => {
    onClose()
  }

  const onSetDefault = () => {
    setDefault({ ...address, is_default: true })
  }
  return (
    <div className="mt-2 flex flex-col gap-1">
      <Link href={`/account/addresses/${address.id}`} className="flex">
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
        onClick={onSetDefault}
      >
        Set as Default
      </Button>
    </div>
  )
}

export default AddressActions
