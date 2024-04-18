import { NextApiRequest, NextApiResponse } from "next";
import EventSave from "../../../types/EventSave";
import prisma from "../../../prisma";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const event: EventSave = req.body;
  if (req.method === "POST") {
    const createdEvent = await addEvent(event);
    res.status(201).json(createdEvent);
  }
  if (req.method === "PUT") {
    if (!event.id) {
      res.status(404).json({});
    } else {
      const editedEvent = await editEvent(event.id, event);
      res.status(200).json(editedEvent);
    }
  }
  if (req.method === "DELETE") {
    if (!event.id) {
      res.status(404).json({});
    } else {
      const editedEvent = await deleteEvent(event.id);
      res.status(204).json(editedEvent);
    }
  }
}

async function addEvent(event: EventSave) {
  return await prisma.event.create({
    data: event,
  });
}

async function editEvent(id: string, event: EventSave) {
  return await prisma.event.update({
    where: { id: id },
    data: event,
  });
}

async function deleteEvent(id: string) {
  return await prisma.event.delete({
    where: { id: id },
  });
}
