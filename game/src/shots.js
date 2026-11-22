// Sunset Vaults — staged screenshots and the selftest. One job: put the
// live game into a fixed, readable pose for each screenshot (?shot=),
// and prove the mechanics work (?selftest=1) without a human playing.
import { ROOMS } from './levels.js';
import { raycast, lineOfSight, moveCircle, pointInRect } from './geometry.js';
import { updateWatchers } from './guards.js';
import { ROOM_W, ROOM_H } from './config.js';

export function stageShot(S, name) {
  if (name === 'cover') {
    S.loadRoom(0);
    S.screen = 'play';
    S.time = 47;
    S.player = { x: 200, y: 452, dir: -0.49, sneak: true };
    S.playerHidden = true;
    S.visibility = 0.35;
    S.noise = 0.25;
    S.detection = 62;
    S.alarm = 34;
    S.money = 200;
    S.loot[1].taken = true;
    S.loot[2].taken = true;
    S.lootGot = 2;
    S.roomsLootGot = [2, 0, 0];
    const g = S.guards[0];
    g.x = 430; g.y = 385; g.angle = 2.86;
    g.state = 'suspicious'; g.suspicion = 62;
    g.lastSeen = { x: 200, y: 452 };
    S.cameras[0].suspicion = 10;
    S.floats = [{ x: 205, y: 415, text: '+$200', color: '#7dffab', t: 0.5 }];
    S.log = ['Budi curiga: "APA ITU?"', 'Koin emas +$100', 'Koin emas +$100', 'Raka masuk Aula Bank.'];
  } else if (name === 'vault') {
    S.loadRoom(1);
    S.screen = 'play';
    S.time = 132;
    S.player = { x: 210, y: 400, dir: 0, sneak: true };
    S.playerHidden = false;
    S.visibility = 0.45;
    S.noise = 0.15;
    S.detection = 18;
    S.alarm = 12;
    S.money = 800;
    S.loot[0].taken = true;
    S.lootGot = 1;
    S.roomsLootGot = [3, 1, 0]; // ruangan 1 sudah selesai sebelum masuk brankas
    const g = S.guards[0];
    g.x = 440; g.y = 500; g.angle = -Math.PI / 2;
    g.state = 'patrol'; g.suspicion = 12;
    const c0 = S.cameras[0];
    c0.t = -0.14; c0.angle = -0.07; c0.suspicion = 45;
    S.cameras[1].suspicion = 5;
    S.log = ['Mahkota Ledger diambil +$800.', 'Laser aktif — jangan sentuh.', 'Sari berpatroli di brankas.'];
  } else if (name === 'title') {
    S.loadRoom(0);
    S.screen = 'title';
    S.time = 1.0;
  } else if (name === 'victory') {
    S.loadRoom(2);
    S.screen = 'victory';
    S.time = 277;
    S.money = 2400;
    for (const l of S.loot) l.taken = true;
    S.lootGot = 2;
    S.roomsLootGot = [3, 3, 2];
    S.allLoot = true;
    S.victory = {
      loot: 2400, ghost: 500, speed: 240, total: 3140,
      timeText: '04:37', lootCount: 8, lootTotal: 8,
    };
    S.log = ['Kunci Master Senja diambil +$1000.', 'Raka kabur lewat atap!'];
  }
}

// Run the mechanics headlessly and report PASS/FAIL into the page.
export function runSelftest(S, api) {
  const results = [];
  const t = (name, fn) => {
    try {
      const ok = fn();
      results.push(`${ok ? 'PASS' : 'FAIL'} ${name}`);
    } catch (e) {
      results.push(`FAIL ${name}: ${e.message}`);
    }
  };

  t('raycast stops at a pillar', () => {
    const d = raycast(100, 152, 0, 500, S.room.blocks, ROOM_W, ROOM_H);
    return d < 500 && d > 100; // pillar at x 250 in room 1
  });
  t('line of sight is blocked by a pillar', () => {
    const blocked = lineOfSight(100, 152, 400, 152, S.room.blocks, ROOM_W, ROOM_H);
    const clear = lineOfSight(100, 100, 700, 100, S.room.blocks, ROOM_W, ROOM_H);
    return blocked === false && clear === true;
  });
  t('movement cannot pass through a wall block', () => {
    const next = moveCircle(240, 152, 40, 0, 11, S.room.blocks, ROOM_W, ROOM_H);
    return next.x < 250; // pillar face at x=250
  });
  t('all three rooms load', () => {
    for (let i = 0; i < 3; i++) {
      api.loadRoom(i);
      if (!S.room || S.guards.length < 1 || S.loot.length < 1) return false;
    }
    return ROOMS.length === 3;
  });
  t('guard suspicion rises inside the cone', () => {
    api.loadRoom(0);
    const g = S.guards[0];
    // Guard faces its first waypoint (west); stand dead ahead, in the open.
    g.angle = Math.PI;
    S.player.x = g.x - 100;
    S.player.y = g.y;
    S.player.sneak = false;
    S.visibility = 1;
    S.screen = 'play';
    updateWatchers(S, 0.5);
    return g.suspicion > 10 && S.detection > 10;
  });
  t('loot pickup adds money', () => {
    api.loadRoom(0);
    const before = S.money;
    const l = S.loot[0];
    S.player.x = l.x; S.player.y = l.y;
    const got = api.tryPickup();
    return got === true && S.money === before + l.value && l.taken === true;
  });
  t('coin throw sends a guard to investigate', () => {
    api.loadRoom(0);
    S.coins = 3;
    api.throwCoin(500, 500);
    return S.coins === 2 && S.guards[0].state === 'investigate';
  });
  t('laser touch raises the alarm', () => {
    api.loadRoom(1);
    S.alarm = 0;
    S.player.x = 440; S.player.y = 200; // on the first laser line
    api.update(0.1);
    return S.alarm > 0;
  });
  t('exit with all loot advances the room', () => {
    api.loadRoom(0);
    for (const l of S.loot) l.taken = true;
    S.lootGot = S.lootTotal;
    S.allLoot = true;
    const e = S.room.exit;
    S.player.x = e.x + e.w / 2;
    S.player.y = e.y + e.h / 2;
    S.lockdown = 0;
    api.update(0.016);
    return S.roomIndex === 1;
  });
  t('a chasing guard catches the thief', () => {
    api.loadRoom(0);
    const g = S.guards[0];
    g.state = 'chase';
    g.suspicion = 90;
    g.x = S.player.x + 5;
    g.y = S.player.y;
    S.screen = 'play';
    api.update(0.05);
    return S.screen === 'caught';
  });

  const passed = results.filter((r) => r.startsWith('PASS')).length;
  const summary = `SELFTEST ${passed}/${results.length} PASS`;
  const el = document.getElementById('selftest');
  if (el) el.textContent = `${summary}\n${results.join('\n')}`;
  document.title = summary;
  return { passed, total: results.length, results };
}
