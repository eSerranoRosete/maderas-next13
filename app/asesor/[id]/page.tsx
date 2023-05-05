import { Form } from "@/components/Form";
import { IFUserDocument } from "@/types/appTypes";
import { API_ENDPOINT } from "@/utils/settings";

async function getData(id: string) {
  const res = await fetch(API_ENDPOINT + id);
  if (!res.ok) {
    throw new Error("An error occurred while fetching the data.");
  }
  return res.json();
}

interface IFParams {
  params: { id: string };
}
export default async function AsesorPage({ params }: IFParams) {
  const data = (await getData(params.id)) as IFUserDocument;

  return (
    <Form
      displayName={`${data.firstName} ${data.lastName}`}
      leadFieldsRequired={false}
    />
  );
}
