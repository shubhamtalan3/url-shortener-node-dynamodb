import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
    DynamoDBDocumentClient,
    PutCommand,
    GetCommand,
    DeleteCommand,
} from '@aws-sdk/lib-dynamodb';

const client = new DynamoDBClient({
    region: 'us-east-1',
    endpoint: 'http://localhost:8000',
});
const docClient = DynamoDBDocumentClient.from(client);

export async function saveUrl(code, long_url, expiry = null) {
    await docClient.send(
        new PutCommand({
            TableName: 'URLMapping',
            Item: { code, long_url, created_at: Date.now(), expiry },
        })
    );
}

export async function getUrl(code) {
    const res = await docClient.send(
        new GetCommand({
            TableName: 'URLMapping',
            Key: { code },
        })
    );
    return res.Item;
}

export async function deleteUrl(code) {
    await docClient.send(
        new DeleteCommand({
            TableName: 'URLMapping',
            Key: { code },
        })
    );
}
