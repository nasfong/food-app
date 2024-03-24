import Dexie from 'dexie';

export interface Friend {
  id?: number; // optional because it's auto-incremented by IndexedDB
  name: string;
  price: number;
  description: string;
  star: number;
  image: string;
  foodType: string
  quantity: number;
}
interface MyDatabase extends Dexie {
  friends: Dexie.Table<Friend, number>; // number is the type of primary key
}

const db = new Dexie('Food') as MyDatabase;

db.version(1).stores({
  friends: '++id,name,price,quantity,description,star,image,foodType', // '++id' signifies auto-incremented primary key
});

export async function addFriend(friend: Friend): Promise<number> {
  return await db.friends.add(friend);
}

export async function getFriend(id: number): Promise<Friend | undefined> {
  return await db.friends.get(id);
}

export async function updateFriend(id: number, updates: Partial<Friend>): Promise<number | void> {
  const updatedItemId = await db.friends.update(id, updates);
  return updatedItemId; // Return the updated item's ID
}

export async function deleteFriend(id: number): Promise<void> {
  return await db.friends.delete(id);
}

export async function getAllFriends(): Promise<Friend[]> {
  return await db.friends.toArray();
}
