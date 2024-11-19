import type { Meta, StoryFn } from "@storybook/react"
import type { SubmitHandler } from "react-hook-form"
import {
  AngryIcon,
  FrownIcon,
  GhostIcon,
  LaughIcon,
  SmileIcon,
  SmilePlusIcon,
} from "@yamada-ui/lucide"
import { Button, Fieldset, Rating, VStack } from "@yamada-ui/react"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"

type Story = StoryFn<typeof Rating>

const meta: Meta<typeof Rating> = {
  component: Rating,
  title: "Components / Forms / Rating",
}

export default meta

export const basic: Story = () => {
  return <Rating />
}

export const withSize: Story = () => {
  return (
    <>
      <Rating size="xs" defaultValue={3} />
      <Rating size="sm" defaultValue={3} />
      <Rating size="md" defaultValue={3} />
      <Rating size="lg" defaultValue={3} />
      <Rating size="xl" defaultValue={3} />
    </>
  )
}

export const withColorScheme: Story = () => {
  return (
    <>
      <Rating colorScheme="purple" defaultValue={3} />
      <Rating colorScheme="pink" defaultValue={3} />
    </>
  )
}

export const withDefaultValue: Story = () => {
  return <Rating defaultValue={3} />
}

export const withItems: Story = () => {
  return (
    <>
      <Rating items={4} />
      <Rating items={5} />
      <Rating items={6} />
    </>
  )
}

export const withFractions: Story = () => {
  return (
    <>
      <Rating defaultValue={1.5} fractions={2} />
      <Rating defaultValue={2.33} fractions={3} />
      <Rating defaultValue={3.75} fractions={4} />
    </>
  )
}

export const withHighlightSelectedOnly: Story = () => {
  return <Rating defaultValue={3} highlightSelectedOnly />
}

export const isDisabled: Story = () => {
  return (
    <>
      <Rating defaultValue={3} isDisabled />

      <Fieldset isDisabled legend="How satisfied are you with Yamada UI?">
        <Rating defaultValue={3} />
      </Fieldset>
    </>
  )
}

export const isReadonly: Story = () => {
  return (
    <>
      <Rating defaultValue={3} isReadOnly />

      <Fieldset isReadOnly legend="How satisfied are you with Yamada UI?">
        <Rating defaultValue={3} />
      </Fieldset>
    </>
  )
}

export const customColor: Story = () => {
  const getColor = (value: number) => {
    switch (value) {
      case 1:
        return "red.500"

      case 2:
        return "orange.500"

      case 3:
        return "yellow.500"

      case 4:
        return "green.500"

      case 5:
        return "blue.500"

      default:
        return undefined
    }
  }

  return (
    <>
      <Rating color="green.500" defaultValue={3} />
      <Rating color={getColor} defaultValue={3} />
      <Rating color={getColor} defaultValue={3} fractions={3} />
    </>
  )
}

export const customIcon: Story = () => {
  const getColor = (value: number) => {
    switch (value) {
      case 1:
        return "red.500"

      case 2:
        return "orange.500"

      case 3:
        return "yellow.500"

      case 4:
        return "green.500"

      case 5:
        return "blue.500"

      default:
        return undefined
    }
  }

  const getIcon = (value: number) => {
    switch (value) {
      case 1:
        return <AngryIcon />

      case 2:
        return <FrownIcon />

      case 3:
        return <SmileIcon />

      case 4:
        return <LaughIcon />

      case 5:
        return <SmilePlusIcon />

      default:
        return null
    }
  }

  return (
    <>
      <Rating
        defaultValue={3}
        emptyIcon={<GhostIcon />}
        filledIcon={<GhostIcon />}
      />

      <Rating
        defaultValue={2}
        emptyIcon={<GhostIcon />}
        filledIcon={<GhostIcon />}
        fractions={3}
      />

      <Rating emptyIcon={getIcon} filledIcon={getIcon} gap="xs" />

      <Rating
        color={getColor}
        emptyIcon={getIcon}
        filledIcon={getIcon}
        gap="xs"
      />

      <Rating emptyIcon={getIcon} filledIcon={getIcon} fractions={3} gap="xs" />
    </>
  )
}

export const customControl: Story = () => {
  const [value, onChange] = useState<number>(3)

  return <Rating value={value} onChange={onChange} />
}

export const reactHookForm: Story = () => {
  interface Data {
    rating: number
  }

  const defaultValues: Data = {
    rating: 3,
  }

  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<Data>({ defaultValues })

  const onSubmit: SubmitHandler<Data> = (data) => console.log("submit:", data)

  console.log("watch:", watch())

  return (
    <VStack as="form" onSubmit={handleSubmit(onSubmit)}>
      <Fieldset
        errorMessage={errors.rating?.message}
        isInvalid={!!errors.rating}
        legend="How satisfied are you with Yamada UI?"
      >
        <Controller
          name="rating"
          control={control}
          render={({ field }) => <Rating {...field} />}
        />
      </Fieldset>

      <Button type="submit" alignSelf="flex-end">
        Submit
      </Button>
    </VStack>
  )
}
