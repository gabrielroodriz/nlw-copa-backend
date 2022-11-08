import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
async function main() {
	const user = await prisma.user.create({
		data: {
			name: 'John Doe',
			email: 'johndoe@gmail.com',
			avatarUrl: 'http://github.com/gabrielroodriz.png',
		},
	});
	const pool = await prisma.pool.create({
		data: {
			title: 'Example Pool',
			code: 'EXL1001',
			ownerId: user.id,
			participants: {
				create: {
					userId: user.id,
				},
			},
		},
	});

	await prisma.game.create({
		data: {
			date: '2022-11-07T23:49:37.707Z',
			firstTeamCountryCode: 'AS',
			secondTeamCountryCode: 'DE',
		},
	});

	await prisma.game.create({
		data: {
			date: '2022-11-05T23:49:37.707Z',
			firstTeamCountryCode: 'BR',
			secondTeamCountryCode: 'AR',
			guesses: {
				create: {
					firstTeamPoint: 1,
					secondTeamPoint: 2,
					participant: {
						connect: {
							userId_poolId: {
								userId: user.id,
								poolId: pool.id,
							},
						},
					},
				},
			},
		},
	});
}

main();
