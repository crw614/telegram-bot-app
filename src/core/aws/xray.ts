import { invokeLambda } from '../../utils'

const url = 'https://epy9udvh20.execute-api.eu-central-1.amazonaws.com/prod/'

interface XRayStats {
  url: string;
  image: Buffer;
}

export const getXRayStats = async (): Promise<XRayStats> => {
  const options = {
    FunctionName: 'screenshot-service-prod-png',
    Payload: JSON.stringify({ queryStringParameters: { url } }),
  }

  const result = await invokeLambda(options)
  const image = Buffer.from(JSON.parse(result.Payload).body, 'base64')

  return { url, image }
}
